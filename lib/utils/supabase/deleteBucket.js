import { supabase } from '@/lib/utils/supabase/supabase'

const deleteAllObjectsInBucket = async bucketName => {
  await supabase.from('storage').delete().eq('bucket_id', bucketName)

  // if (error) {
  //   throw error
  // }

  // console.log('Objects deleted successfully:', data)
}

deleteAllObjectsInBucket('your_bucket_name')

export default deleteAllObjectsInBucket
