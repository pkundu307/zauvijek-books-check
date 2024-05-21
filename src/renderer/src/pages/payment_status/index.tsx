import * as React from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { Button, Progress, Stack, Text } from '@chakra-ui/react'
import { RiAccountCircleLine } from 'react-icons/ri'

import Layout from '@renderer/layouts/default'
import { useAuthentication } from '@renderer/hooks/useAuthentication'
import { getBillingStatus } from '@renderer/services/setting/billing'

export default function PaymentStatus() {
  const [searchParams] = useSearchParams()

  const { user } = useAuthentication()
  const [status, setStatus] = React.useState('Activating...')

  React.useEffect(() => {
    async function fetchData() {
      const digest = {
        merchant_transaction_id: searchParams.get('merchant_transaction_id'),
        account_id: searchParams.get('account_id'),
        billing_id: searchParams.get('billing_id'),
        name: user?.name,
        phone_no: user?.phone_no
      }

      const res = await getBillingStatus(digest)

      if (res === 'PAYMENT_SUCCESS') {
        setStatus('Activated')
      } else {
        setStatus('Failed')
      }
    }
    fetchData()
  }, [])

  return (
    <Layout>
      <Stack
        w={'100%'}
        h={'75vh'}
        spacing={6}
        direction={'column'}
        justify={'center'}
        align={'center'}
      >
        <Text fontSize={'2xl'} fontWeight={600}>
          Account Status
        </Text>
        <Text fontSize={'lg'}>Checking account activation status...</Text>
        <Progress
          w={'400px'}
          colorScheme={status === 'Activated' ? 'green' : 'orange'}
          my={6}
          hasStripe
          value={status === 'Activated' ? 100 : 40}
        />
        <Text
          fontWeight={600}
          color={status === 'Activated' ? 'green.600' : 'orange.600'}
          textTransform={'uppercase'}
        >
          STATUS: {status}
        </Text>
        {status === 'Activated' && (
          <Link to={'/'}>
            <Button leftIcon={<RiAccountCircleLine />} size={'lg'} colorScheme={'whatsapp'}>
              Go to Dashboard
            </Button>
          </Link>
        )}
      </Stack>
    </Layout>
  )
}
