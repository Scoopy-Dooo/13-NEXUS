import React, { useContext } from 'react'
import { useQuery } from '@tanstack/react-query';
import { GetNotes } from '../../Services/GetNOtifications';
import { AuthContext } from '../../Contexts/AuthContext';
import NoteCard from '../../Components/UI/NoteCard';

export default function Notifications() {
  const { token } = useContext(AuthContext)
  const { data: notes, isLoading: notesLoading } = useQuery({
    queryKey: ['notes'],
    queryFn: () => GetNotes(token)
    ,
    refetchOnMount: true,
    refetchOnWindowFocus: true,
    staleTime: 1000 * 60 // 1 minute
  })

  console.log("🚀 ~ Notifications ~ notesLoading:", notesLoading)
  console.log("🚀 ~ Notifications ~ notes:", notes)



  return <div className="w-full min-h-screen px-1 md:px-4 pb-10">
    <h1 className='text-white my-4'>Notifications</h1>
    <div className="content grid grid-cols-1 gap-4">

      {notes && notes?.data?.notifications.map((note) => (
        <NoteCard key={note.id} note={note} />
      ))}

    </div>

  </div>
}
