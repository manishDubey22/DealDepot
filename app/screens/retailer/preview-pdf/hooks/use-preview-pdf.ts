import { useState, useCallback, useMemo, useEffect } from "react"
import { Platform } from "react-native"
// eslint-disable-next-line react-native/split-platform-components
import { PermissionsAndroid } from "react-native"
// import RNFS from "react-native-fs"
// import RNHTMLtoPDF from "react-native-html-to-pdf"
import Share from "react-native-share"
import Toast from "react-native-toast-message"

import type { Order, VendorData, PDFData } from "@/api/retailer/orders/types"

import { CONSOLE_MESSAGES, ERROR_MESSAGES, UI_TEXT } from "../lib/constants"
import type { UsePreviewPDFReturn } from "../lib/types"

// Safe number for PDF display (handles undefined, null, string from API)
const toPdfNumber = (v: unknown): number => {
  if (typeof v === "number" && !isNaN(v) && isFinite(v)) return v
  const n = Number(v)
  return typeof n === "number" && !isNaN(n) && isFinite(n) ? n : 0
}

// Generate HTML content for PDF
const generateHTMLContent = (order: Order, vendorData: VendorData): string => {
  const formatDate = (dateString: string) => {
    try {
      return dateString?.split?.("T")?.[0] ?? String(dateString ?? "")
    } catch {
      return String(dateString ?? "")
    }
  }

  // Generate table rows for each wholesaler's items
  const generateTableRows = (pdfData: PDFData[]) => {
    return (pdfData ?? [])
      .map((data) => {
        const items = data?.items ?? []
        const itemRows = items
          .map((item) => {
            const price = toPdfNumber(item?.price)
            const productTotalPrice = toPdfNumber(item?.productTotalPrice)
            const productId = item?.product_id ?? ""
            const name = item?.name ?? ""
            const qty = toPdfNumber(item?.items)
            return `
          <tr>
            <td style="padding: 8px; border: 1px solid #ddd; text-align: left;">${productId}</td>
            <td style="padding: 8px; border: 1px solid #ddd; text-align: left;">${name}</td>
            <td style="padding: 8px; border: 1px solid #ddd; text-align: center;">${qty}</td>
            <td style="padding: 8px; border: 1px solid #ddd; text-align: right;">$${price.toFixed(2)}</td>
            <td style="padding: 8px; border: 1px solid #ddd; text-align: right;">$${productTotalPrice.toFixed(2)}</td>
          </tr>
        `
          })
          .join("")

        const dataAny = data as { totalPrice?: number; total?: number }
        const totalPrice = toPdfNumber(dataAny.totalPrice ?? dataAny.total)
        const wholesaler = data?.wholesalerData ?? {}

        return `
        <div style="margin-bottom: 30px;">
          <h3 style="color: #333; margin-bottom: 10px;">Wholesaler Information</h3>
          <p><strong>Name:</strong> ${wholesaler.wholesaler_name ?? ""}</p>
          <p><strong>Location:</strong> ${wholesaler.wholesaler_location ?? ""}</p>
          <p><strong>City:</strong> ${wholesaler.city ?? ""}, ${wholesaler.zipCode ?? ""}</p>
          <p><strong>Phone:</strong> ${wholesaler.wholesaler_number ?? ""}</p>
          <p><strong>Email:</strong> ${wholesaler.wholesaler_email ?? ""}</p>
          
          <h3 style="color: #333; margin-top: 20px; margin-bottom: 10px;">Items</h3>
          <table style="width: 100%; border-collapse: collapse; margin-top: 10px;">
            <thead>
              <tr style="background-color: #f5f5f5;">
                <th style="padding: 10px; border: 1px solid #ddd; text-align: left;">Product ID</th>
                <th style="padding: 10px; border: 1px solid #ddd; text-align: left;">Product Name</th>
                <th style="padding: 10px; border: 1px solid #ddd; text-align: center;">Quantity</th>
                <th style="padding: 10px; border: 1px solid #ddd; text-align: right;">Unit Price</th>
                <th style="padding: 10px; border: 1px solid #ddd; text-align: right;">Total</th>
              </tr>
            </thead>
            <tbody>
              ${itemRows}
            </tbody>
            <tfoot>
              <tr>
                <td colspan="4" style="padding: 8px; border: 1px solid #ddd; text-align: right; font-weight: bold;">Total:</td>
                <td style="padding: 8px; border: 1px solid #ddd; text-align: right; font-weight: bold;">$${totalPrice.toFixed(2)}</td>
              </tr>
            </tfoot>
          </table>
        </div>
      `
      })
      .join("")
  }

  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          body {
            font-family: Arial, sans-serif;
            margin: 20px;
            color: #333;
          }
          h1 {
            color: #2c3e50;
            border-bottom: 2px solid #3498db;
            padding-bottom: 10px;
          }
          h2 {
            color: #34495e;
            margin-top: 20px;
          }
          h3 {
            color: #555;
          }
          .header {
            margin-bottom: 30px;
          }
          .info-section {
            margin-bottom: 20px;
          }
          table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 10px;
          }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>Purchase Order</h1>
          <p><strong>Order ID:</strong> ${order.orderId}</p>
          <p><strong>Date:</strong> ${formatDate(order.date)}</p>
        </div>
        
        <div class="info-section">
          <h2>Retailer Information</h2>
          <p><strong>Store Name:</strong> ${vendorData.storeName}</p>
          <p><strong>Location:</strong> ${vendorData.location}</p>
          <p><strong>City:</strong> ${vendorData.city}, ${vendorData.zipCode}</p>
          <p><strong>Phone:</strong> ${vendorData.number}</p>
          <p><strong>Email:</strong> ${vendorData.email}</p>
        </div>
        
        ${generateTableRows(order.pdfData)}
        
        <div style="margin-top: 30px; padding-top: 20px; border-top: 2px solid #3498db;">
          <h2>Order Summary</h2>
          <p style="font-size: 18px;"><strong>Total Order Price: $${toPdfNumber(order.totalOrderPrice).toFixed(2)}</strong></p>
        </div>
      </body>
    </html>
  `
}

export function usePreviewPDF(
  order: Order | null,
  vendorData: VendorData | null,
): UsePreviewPDFReturn {
  const [isLoading, setIsLoading] = useState(false)
  const [pdfPath, setPdfPath] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  // Same HTML used for file generation and in-app preview
  const htmlContent = useMemo(() => {
    if (!order || !vendorData) return ""
    return generateHTMLContent(order, vendorData)
  }, [order, vendorData])

  // Generate PDF (used for file creation; same HTML as htmlContent is used for in-app preview)
  const generatePDF = useCallback(async () => {
    if (!order || !vendorData) return
    setIsLoading(true)
    setError(null)

    try {
      console.log(CONSOLE_MESSAGES.GENERATING_PDF)

      const html = generateHTMLContent(order, vendorData)
      const fileName = `Order_${order.orderId}_${Date.now()}.pdf`

      console.log(fileName)

      // Determine file path based on platform
      // const filePath =
      //   Platform.OS === "ios"
      //     ? `${RNFS.DocumentDirectoryPath}/${fileName}`
      //     : `${RNFS.DownloadDirectoryPath}/${fileName}`

      // const options = {
      //   html: html,
      //   fileName: fileName,
      //   directory: (Platform.OS === "ios" ? "Documents" : "Downloads") as "Documents" | "Downloads",
      //   base64: false,
      // }

      // const file = await RNHTMLtoPDF.convert(options)
      // console.log(CONSOLE_MESSAGES.PDF_GENERATED, file.filePath)
      // setPdfPath(file.filePath || filePath)

      Toast.show({
        text1: UI_TEXT.SUCCESS,
        type: "success",
      })
    } catch (err: any) {
      const errorMessage = err?.message || ERROR_MESSAGES.GENERATION_FAILED
      console.error(CONSOLE_MESSAGES.PDF_ERROR, err)
      setError(errorMessage)
      Toast.show({
        text1: UI_TEXT.ERROR,
        text2: errorMessage,
        type: "error",
      })
    } finally {
      setIsLoading(false)
    }
  }, [order, vendorData])

  // Auto-generate PDF on mount so the preview is shown immediately (no Generate button)
  useEffect(() => {
    if (order && vendorData) {
      generatePDF()
    }
  }, [order, vendorData, generatePDF])

  // Request storage permission for Android
  const requestStoragePermission = useCallback(async (): Promise<boolean> => {
    if (Platform.OS !== "android") {
      return true
    }

    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: "Storage Permission",
          message: "App needs access to your storage to save the PDF.",
          buttonNeutral: "Ask Me Later",
          buttonNegative: "Cancel",
          buttonPositive: "OK",
        },
      )
      return granted === PermissionsAndroid.RESULTS.GRANTED
    } catch (err) {
      console.warn("Permission error:", err)
      return false
    }
  }, [])

  // Share PDF
  const sharePDF = useCallback(async () => {
    if (!pdfPath) {
      Toast.show({
        text1: ERROR_MESSAGES.NO_PDF,
        type: "error",
      })
      return
    }

    try {
      console.log(CONSOLE_MESSAGES.SHARING_PDF)
      await Share.open({
        url: `file://${pdfPath}`,
        type: "application/pdf",
        title: `Order ${order?.orderId ?? ""}`,
      })
    } catch (err: any) {
      if (err?.message !== "User did not share") {
        console.error("Share error:", err)
        Toast.show({
          text1: ERROR_MESSAGES.SHARE_FAILED,
          text2: err?.message,
          type: "error",
        })
      }
    }
  }, [pdfPath, order?.orderId])

  // Download PDF (for Android, already saved to Downloads)
  const downloadPDF = useCallback(async () => {
    if (!pdfPath) {
      Toast.show({
        text1: ERROR_MESSAGES.NO_PDF,
        type: "error",
      })
      return
    }

    const hasPermission = await requestStoragePermission()
    if (!hasPermission) {
      Toast.show({
        text1: "Permission Denied",
        text2: "Storage permission is required to download PDF",
        type: "error",
      })
      return
    }

    try {
      console.log(CONSOLE_MESSAGES.DOWNLOADING_PDF)
      Toast.show({
        text1: "PDF Downloaded",
        text2: Platform.OS === "ios" ? "Saved to Documents" : "Saved to Downloads",
        type: "success",
      })
    } catch (err: any) {
      console.error("Download error:", err)
      Toast.show({
        text1: ERROR_MESSAGES.DOWNLOAD_FAILED,
        text2: err?.message,
        type: "error",
      })
    }
  }, [pdfPath, requestStoragePermission])

  return {
    isLoading,
    pdfPath,
    error,
    htmlContent,
    generatePDF,
    sharePDF,
    downloadPDF,
  }
}
