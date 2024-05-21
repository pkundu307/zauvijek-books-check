import React from 'react'
import { Box, Flex, Image, Text } from '@chakra-ui/react'
import { useDropzone } from 'react-dropzone'
import { RiBox3Line } from 'react-icons/ri'

import useThemeMode from '@renderer/hooks/useThemeMode'

export default function UploadImage({ value, onChange, ...rest }: any) {
  const { mode40, mode60 } = useThemeMode()

  const [uploadError, setUploadError] = React.useState<string>()
  const [preview, setPreview] = React.useState<any>()

  React.useEffect(() => {
    if (value) {
      setPreview(value?.url)
    }
  }, [value])

  const onDrop = React.useCallback(
    async (acceptedFiles: any, rejectedFiles: any) => {
      setUploadError('')
      if (rejectedFiles.length > 0) {
        switch (rejectedFiles[0].errors[0].code) {
          case 'file-invalid-type': {
            setUploadError('Invalid File Type')
            break
          }
          case 'file-too-large': {
            setUploadError('Max file size allowed is 10 Mb')
            break
          }
          default:
            break
        }
      }

      if (acceptedFiles.length > 0) {
        const file = acceptedFiles[0]
        const reader = new FileReader()

        setPreview('')
        reader.addEventListener(
          'load',
          () => {
            // convert image file to base64 string
            const preview = reader.result
            setPreview(preview)
          },
          false
        )

        if (file) {
          reader.readAsDataURL(file)
          onChange(acceptedFiles)
        }
      }
    },
    [onChange]
  )

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    minSize: 0,
    maxSize: 10000000, // 10 Mb
    accept: {
      'image/*': ['.png', '.jpeg', '.jpg']
    },
    ...rest
  })

  return (
    <Box {...getRootProps({ onClick: (e) => e.preventDefault() })}>
      <input type="file" {...getInputProps()} />
      {isDragActive ? (
        <Flex
          w="100px"
          h="100px"
          direction="column"
          justify="center"
          align="center"
          color={mode60}
          border="2px dashed"
          borderColor={mode40}
        >
          <Text my={2} fontSize={'sm'}>
            Drop the files here ...
          </Text>
        </Flex>
      ) : (
        <Flex
          as="button"
          w="100px"
          h="100px"
          direction="column"
          justify="center"
          align="center"
          color={mode60}
          border="2px dashed"
          borderColor={mode40}
        >
          {preview ? <Image src={preview && preview} /> : <RiBox3Line size={'28px'} />}
        </Flex>
      )}
      {uploadError && (
        <Text my={2} color={'red.500'} fontSize={'sm'}>
          {uploadError}
        </Text>
      )}
    </Box>
  )
}
