import { supabase } from '@/lib/utils/supabase/supabase'

const deleteAllObjectsInBucket = async bucketName => {
  const { data, error } = await supabase
    .from('storage')
    .delete()
    .eq('bucket_id', bucketName)

  if (error) {
    console.error('Error deleting objects:', error.message)
    return
  }

  console.log('Objects deleted successfully:', data)
}

deleteAllObjectsInBucket('your_bucket_name')

export default deleteAllObjectsInBucket
