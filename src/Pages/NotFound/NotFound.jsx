import { Link } from 'react-router';
import { FaArrowLeft } from 'react-icons/fa';
import logo from '../../assets/logo2 cut.png';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center text-center px-4">
      <img src={logo} alt="NEXUS" className="w-16 mb-4 animate-pulse" />
      <h1 className="text-8xl font-bold bg-clip-text text-transparent bg-linear-to-r from-indigo-500 to-pink-400">404</h1>
      <p className="text-white text-2xl font-semibold mt-2">Page Not Found</p>
      <p className="text-slate-400 mt-2 mb-8">Looks like this page got lost in the network.</p>
      <Link
        to="/home"
        className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white transition-all"
      >
        <FaArrowLeft /> Back to Home
      </Link>
    </div>
  );
}
