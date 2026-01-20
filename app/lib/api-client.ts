import Axios, { InternalAxiosRequestConfig } from "axios"

import { getApiUrl } from "./api-config"

const getBaseURL = () => {
  return getApiUrl()
}

function authRequestInterceptor(config: InternalAxiosRequestConfig) {
  if (config.headers) {
    config.headers.Accept = "application/json"

    if (!config.url?.includes("preauth") && window.location.href.includes("localhost")) {
      config.headers.Authorization = `Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6IjgyREU5RTY1NjI3MEU5NDBGRkU5RUU1OThCNEMwREJCQkEzRkQxMjQiLCJ4NXQiOiJndDZlWldKdzZVRF82ZTVaaTB3TnU3b18wU1EiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2RldnRlc3QuY2FuYXRvbmUuY29tL2Rldi9pZGVudGl0eSIsImV4cCI6MTc2NDE1MTYyNSwiaWF0IjoxNzU1NTExNjI1LCJhdWQiOiJ1aSIsInN1YiI6IjMiLCJuYW1lIjoiZGV2TWV0cmNAaWxsdW1pZnkuY29tIiwiZ2l2ZW5fbmFtZSI6ImRldiIsImZhbWlseV9uYW1lIjoiTWV0cmMiLCJjcGktdGVuYW50LWlkIjoiMTAyIiwiZW1haWwiOiJkZXZNZXRyY0BpbGx1bWlmeS5jb20iLCJjcGktc2VjdXJpdHktYWNjb3VudC1pZC1saXN0IjoiNCIsImNwaS1zZWN1cml0eS1hY2NvdW50LWlkIjoiNCIsIm9pX2F1X2lkIjoiZWJjNjVhMTctM2FmMy00MTFjLWFmNDMtY2YxZWNlMWU3YTI5IiwiYXpwIjoidWkiLCJhdF9oYXNoIjoiV1BmMTF3a21oTm5hVjA3Wm12a29VdyIsIm9pX3Rrbl9pZCI6IjFlYmFlYjZhLTY5MmItNDBjMi04NzNmLWNmOGFlYTU2ZGVkMSJ9.AP0Do4z-MMdVJEyM_noJ53097haPlDMS8y__KnNXDaWF1MxXb3LJZEdfbTtzWwDMogcSKukjMlnyvLEkTeCmfpN-sJ80tUa2WyNosqofiA3x_Im26Ht_gU6yN_AZoVC7X-jRRZS3jSvGqbfZoqkdYvVavhejAxn1qDXSNmm7Z5k8w0cV6BL2772fy3eWTjDxqn22vsibODn4Mb_8B27Yf3_bFg5bXI7xmplgkl1BBLNwOeHVhSkPO2C5NCvjSktGMOmUnS9Fskw6tFv8kdXflonLD0GzltoqV9l-Mj1keu9_wDzTDtOv2ckmEdlQ12NPZCH3YfljHABiGJxVEPFaWOmst-8-FtF5z1PBqLggVzLnEQrKzyEoiUDqc-P0pqW_blQEOa1HvwWxFeifReaEBNysUxHksOvE4_cEmDV_8cDHCLthixvGkjA5NHxHagCzv4p-7rxXK8jPkTnzqWO1nbW7QbC2Z4GjXLCz-8MYvKt6EXGvUXwBlfWVsijeSW3SPE0CkcSuPqXEFh-d9omah50vLV8C8iN36vTJB4baSKUhzoW_YIL5vOqIq7-SZLByGchtCjTl1O3gF2k1sikvp5z4MYSqYFRoWXBQQ7LscOuq1LUtnxv1EJSQaOxML1jtYEACYWqkB_Qciv_hTA-q9ZvcLtu1RxcBpO_GtEuG324`
    }
  }
  return config
}

export const api = Axios.create({ baseURL: getBaseURL() })

api.interceptors.request.use(authRequestInterceptor)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 403) {
      if ((window as any).__show403Error) {
        ;(window as any).__show403Error()
      }
    }

    if (error.response?.status === 501) {
      return api.request(error.config)
    }
    return Promise.reject(error)
  },
)
