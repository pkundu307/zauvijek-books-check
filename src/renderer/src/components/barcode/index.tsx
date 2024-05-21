import { useBarcode } from 'next-barcode'

export default function Barcode({ value }: any) {
  const { inputRef } = useBarcode({
    value,
    options: {
      background: '#fff',
      width: 2,
      height: 60,
      fontSize: 14
    }
  })

  return <svg ref={inputRef} />
}
