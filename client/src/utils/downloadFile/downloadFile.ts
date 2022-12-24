import FileTypes from './fileTypes'

export default function downloadFile({
  data,
  fileType,
  fileName,
}: {
  data: any
  fileType: FileTypes
  fileName: string
}) {
  const blob: Blob = new Blob([data], { type: fileType })
  const dataURI = `data:${fileType};charset=utf-8,${data}`

  const URL = window.URL || window.webkitURL
  const downloadURI =
    typeof URL.createObjectURL === 'undefined'
      ? dataURI
      : URL.createObjectURL(blob)

  const link = document.createElement('a')
  link.setAttribute('href', downloadURI)
  link.setAttribute('download', fileName)
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}
