import type { Order, VendorData } from "@/api/retailer/orders/types"

export interface PreviewPDFScreenProps {
  route: {
    params: {
      order: Order
      vendorData: VendorData
    }
  }
  navigation: any
}

export interface UsePreviewPDFReturn {
  isLoading: boolean
  pdfPath: string | null
  error: string | null
  generatePDF: () => Promise<void>
  sharePDF: () => Promise<void>
  downloadPDF: () => Promise<void>
}
