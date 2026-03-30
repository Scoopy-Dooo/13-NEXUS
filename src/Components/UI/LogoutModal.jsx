import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure
} from "@heroui/react";
import { useContext } from "react";
import { FiLogOut } from "react-icons/fi";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { AuthContext } from "../../Contexts/AuthContext";
import { UserContext } from "../../Contexts/UserContext";

export default function LogoutModal({ trigger }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { setToken } = useContext(AuthContext);
  const { setUserData } = useContext(UserContext);
  const nav = useNavigate();

  function handleLogOut() {
    setUserData(null);
    setToken(null);
    localStorage.removeItem('token');
    localStorage.removeItem('userData');
    nav("/login");
    toast("Logged out successfully");
  }

  return (
    <>
      {trigger
        ? <span onClick={onOpen}>{trigger}</span>
        : <Button onPress={onOpen} variant="ghost" color="danger" className="w-full justify-start gap-2">
          <FiLogOut />Logout
        </Button>
      }

      <Modal hideCloseButton className="bg-slate-900 text-slate-300" isOpen={isOpen} placement="center" onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex items-center gap-2 text-rose-400">
                <FiLogOut />
                Logout
              </ModalHeader>
              <ModalBody>
                <p className="text-slate-400">Are you sure you want to logout?</p>
              </ModalBody>
              <ModalFooter>
                <Button variant="ghost" onPress={onClose} className="text-slate-400">
                  Cancel
                </Button>
                <Button color="danger" variant="shadow" onPress={handleLogOut} className="active:scale-95">
                  Yes, Logout
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}