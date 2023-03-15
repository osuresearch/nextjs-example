import { useRouter } from 'next/router'

const Form = () => {
  const router = useRouter()
  const { id } = router.query

  return <p>Form: {id}</p>
}

export default Form

