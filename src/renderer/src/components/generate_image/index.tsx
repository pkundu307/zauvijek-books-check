import React from 'react'
import { toPng } from 'html-to-image'
import { Button, Flex } from '@chakra-ui/react'
import { RiDownload2Line } from 'react-icons/ri'

type ImageGeneratorPropTypes = {
  children: React.ReactNode
}

export default function GenerateImage({ children }: ImageGeneratorPropTypes) {
  const ref = React.useRef<HTMLDivElement>(null)

  const onButtonClick = React.useCallback(() => {
    if (ref.current === null) {
      return
    }

    toPng(ref.current, { cacheBust: true })
      .then((dataUrl: string) => {
        const link = document.createElement('a')
        link.download = 'download.png'
        link.href = dataUrl
        link.click()
      })
      .catch((err: any) => {
        console.log(err)
      })
  }, [ref])

  return (
    <Flex direction={'column'} justify={'end'}>
      <div ref={ref}>{children}</div>
      <Button
        mt={2}
        px={4}
        colorScheme={'brand'}
        size={'sm'}
        leftIcon={<RiDownload2Line />}
        onClick={onButtonClick}
      >
        Download
      </Button>
    </Flex>
  )
}
