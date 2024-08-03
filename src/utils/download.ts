import JSZip from 'jszip'

export const downloadFile = (blob: Blob, fileName: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    try {
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = fileName
      a.style.display = 'none'
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
      resolve()
    } catch (error) {
      reject(error)
    }
  })
}

type DownloadFile = {
  blob: Blob
  fileName: string
}

/**
 * 打包下载文件
 * @param files 打包文件数组
 * @param zipName 打包文件名
 * @param options
 */
export const downloadZip = async (files: DownloadFile[], zipName: string, options?: JSZip.JSZipFileOptions): Promise<void> => {
  const zip = new JSZip()

  for (const file of files) {
    zip.file(file.fileName, file.blob, options)
  }

  try {
    const content = await zip.generateAsync({ type: 'blob' })
    const url = URL.createObjectURL(content)
    const a = document.createElement('a')
    a.href = url
    a.download = `${zipName}.zip`
    a.style.display = 'none'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
    window.$message.success('ZIP文件下载成功')
  } catch (error) {
    window.$message.error('ZIP文件下载失败: ', error as any)
    throw error
  }
}

export const strToBlob = (str: string, type: string = 'text/plain;charset=utf-8'): Blob => new Blob([str], { type })
