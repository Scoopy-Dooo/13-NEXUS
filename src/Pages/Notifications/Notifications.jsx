import { useContext } from 'react'
import NoteCard from '../../Components/UI/NoteCard'
import { UserContext } from '../../Contexts/UserContext'
import HomeHeader from './../../Components/UI/HomeHeader';

export default function Notifications() {
  const { notesData: notes, notesLoading } = useContext(UserContext)
  // console.log("🚀 ~ Notifications ~ notes:", notes)
  // console.log("🚀 ~ Notifications ~ notesLoading:", notesLoading)

  return <div className="w-full min-h-screen overflow-hidden pb-10">
    <HomeHeader />
    <div className="px-1 md:px-4">
      <h1 className='text-white my-4'>Notifications</h1>
      <div className="content grid grid-cols-1 gap-4">

        {notesLoading && <p className='text-slate-400'>Loading...</p>}
        {!notes || notes?.data?.notifications.length === 0 && <p className='text-slate-400'>No notifications yet.</p>}

        {notes && notes?.data?.notifications.map((note) => (
          <NoteCard key={note?._id} note={note} />
        ))}

      </div>

    </div>
  </div>
}
