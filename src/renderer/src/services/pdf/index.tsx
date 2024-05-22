const pdfBuffer = window.ZauvijekAPI.services.PDF

const createPDF = async (props: any) => {
  try {
    console.log(props)
    const response = await pdfBuffer.generatePDF({})
    return response
  } catch (error: any) {
    console.log(error)
    throw new Error(error.response.data.message)
  }
}

export { createPDF }
