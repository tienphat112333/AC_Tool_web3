import { useState } from 'react'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Icon } from '../ui/Icon'
import type { UserProfile } from '../../types/user'
import { updateUserProfile } from '../../utils/auth'

interface EditProfileModalProps {
  isOpen: boolean
  onClose: () => void
  initialData: UserProfile | null
  onSave: (data: UserProfile) => void
}

const EditProfileModal = ({ isOpen, onClose, initialData, onSave }: EditProfileModalProps) => {
  const [name, setName] = useState(initialData?.username||'')
  const [biography, setBiography] = useState(initialData?.bio||'')
  const [twitter, setTwitter] = useState('')
  const [telegram, setTelegram] = useState('')
  const [discord, setDiscord] = useState('')
  const isSocialInputted = twitter.trim() !== '' || telegram.trim() !== '' || discord.trim() !== '';
  const isNameChanged = name !== (initialData?.username || '');
  const isBioChanged = biography !== (initialData?.bio || '');
  const isSaveEnabled = isSocialInputted || isNameChanged || isBioChanged;
  const handleClose = () => {
    setName(initialData?.username||'')
    setBiography(initialData?.bio||'')
    onClose()
  }

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    if(!initialData) return
    try {
      const newProfile = await updateUserProfile({
        username: name,
        bio: biography,
        telegramUrl: telegram,
        xUrl: twitter,
        githubUrl: discord
      })
      if(newProfile){
        onSave(newProfile)
        alert('update thanh cong!')
        onClose()
      }
    } catch (error) {
      console.log('loi khi update:', error)
      alert('update loi')
    }
  }

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 "
      onClick={handleClose}
    >
      <div
        className="relative w-full max-w-[500px] max-h-[618px] rounded-2xl bg-white p-6 shadow-lg text-base font-medium"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute right-6 top-[30px] text-gray-400 hover:text-gray-600"
          onClick={handleClose}
          aria-label="Close"
        >
          <Icon name="close" className="w-6 h-6" viewBox="0 0 24 24" />
        </button>

        <h2 className="mb-6 text-center text-xl font-bold leading-[28px]">Edit Profile</h2>

        <form className="flex flex-col gap-5" onSubmit={handleSave}>
          <div className="flex flex-col gap-2">
            <div className="space-y-2 font-[400]">
              <label className="text-base font-medium">Name</label>
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                className="h-[52px] w-[452px] py-4 px-[10px] "
              />
            </div>

            <div className="space-y-2">
              <label>Biography</label>
              <textarea
                className="h-[100px] w-[452px]  rounded-lg border border-[#E4E4E7] bg-[#F5FBFB] px-3 py-2 text-sm font-[400] outline-none focus-visible:border-[#009E99] focus-visible:ring-2 focus-visible:ring-primary"
                placeholder="Write your biography here!"
                value={biography}
                onChange={(e) => setBiography(e.target.value)}
              />
            </div>
            <Button
              type="button"
              variant="default"
              size="sm"
              className="w-[66px] h-8 rounded-lg px-4"
              onClick={handleSave}
            >
              Save
            </Button>
          </div>

          <div className="font-normal">
            <p className="font-medium mb-2">Social Links</p>
            <div className="text-sm text-secondary-text flex flex-col gap-2">
              <Input
                icon={<Icon name="Twitter" variant={'fill'} />}
                className="w-[452px] h-[38px] p-[10px]"
                placeholder="Not connected"
                value={twitter}
                onChange={(e) => setTwitter(e.target.value)}
              />
              <Input
                icon={<Icon name="Tele" variant={'fill'} />}
                className="w-[452px] h-[38px] p-[10px]"
                placeholder="Not connected"
                value={telegram}
                onChange={(e) => setTelegram(e.target.value)}
              />
              <Input
                icon={<Icon name="discord" variant={'stroke'} />}
                className="w-[452px] h-[38px] p-[10px]"
                placeholder="Not connected"
                value={discord}
                onChange={(e) => setDiscord(e.target.value)}
              />
            </div>
          </div>

          <Button type="submit" variant={isSaveEnabled? "default" : "disable"} size="lg" className="w-full h-12">
            Save
          </Button>
        </form>
      </div>
    </div>
  )
}

export default EditProfileModal
