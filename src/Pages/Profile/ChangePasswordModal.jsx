import {
    Button,
    Modal,
    ModalBody,
    ModalContent,
    ModalHeader,
    useDisclosure
} from "@heroui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from '@tanstack/react-query';
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { FaEye, FaRegEyeSlash } from "react-icons/fa";
import { toast } from 'react-toastify';
import * as z from "zod";
import InputError from "../../Components/InputError";
import { changePass } from "../../Services/ChangePassword";
import { AuthContext } from './../../Contexts/AuthContext';


const schema = z.object({
    password: z.string().min(1, "Current password is required"),
    newPassword: z.string()
        .min(8, "At least 8 characters")
        .max(20, "At most 20 characters")
        .regex(/[a-z]/, "Must contain a lowercase letter")
        .regex(/[A-Z]/, "Must contain an uppercase letter")
        .regex(/[0-9]/, "Must contain a number")
        .regex(/[!@#$%^&*()]/, "Must contain a special character (!@#$%^&*())"),
    rePassword: z.string()
        .min(8, "At least 8 characters")
        .max(20, "At most 20 characters")
        .regex(/[a-z]/, "Must contain a lowercase letter")
        .regex(/[A-Z]/, "Must contain an uppercase letter")
        .regex(/[0-9]/, "Must contain a number")
        .regex(/[!@#$%^&*()]/, "Must contain a special character (!@#$%^&*())"),
}).refine(data => data.newPassword === data.rePassword, {
    message: "Passwords do not match",
    path: ["rePassword"],
}).refine(data => data.password !== data.newPassword, {
    message: "New password must be different from current password",
    path: ["newPassword"],
});

export default function ChangePassModal() {
    const [showCurrent, setShowCurrent] = useState(false);
    const [showNew, setShowNew] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const { token } = useContext(AuthContext);

    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        defaultValues: {
            password: "",
            newPassword: "",
            rePassword: ""
        },
        resolver: zodResolver(schema),
        mode: 'all',
    });

    const { mutate, isPending } = useMutation({
        mutationFn: (body) => changePass(body, token),
        onSuccess: () => {
            toast.success("Password changed successfully");
            reset();
            onOpenChange(false);
        },
        onError: (error) => {
            toast.error(error?.response?.data?.message || "Failed to change password");
        }
    });

    function onSubmit(data) {
        mutate({ password: data.password, newPassword: data.newPassword });
    }

    return (
        <>
            <Button className="bg-linear-to-l from-purple-600 to-indigo-500 active:scale-85 cursor-pointer transition-all text-white text-sm p-2 rounded-lg font-semibold hover:from-purple-400 hover:to-indigo-400" onPress={onOpen}>Edit Password</Button>
            <Modal hideCloseButton className="bg-slate-900 text-slate-300" isOpen={isOpen} placement="center" onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex items-center justify-between gap-1">
                                <h3>Change Password</h3>
                                <Button className="size-8 min-w-0 p-0!" color="danger" variant="ghost" onPress={onClose}>X</Button>
                            </ModalHeader>
                            <ModalBody>
                                <form className="flex flex-col gap-3" onSubmit={handleSubmit(onSubmit)}>
                                    <input type="text" autoComplete="username" disabled className="hidden" readOnly />
                                    <div>
                                        <label className="font-bold" htmlFor="password">Current Password</label>
                                        <div className="relative w-full">
                                            <input {...register("password")} id="password" autoComplete="current-password"
                                                placeholder="Enter your current password"
                                                className="input-fields focus:outline-none focus:ring-2 focus:ring-indigo-600 text-sm"
                                                type={showCurrent ? "text" : "password"} />
                                            <button type="button" onClick={() => setShowCurrent(p => !p)} className="cursor-pointer p-2 active:scale-95 transition-all absolute right-2 top-1/2 -translate-y-1/2">
                                                {showCurrent ? <FaEye className='text-pink-700' /> : <FaRegEyeSlash className='text-indigo-700' />}
                                            </button>
                                        </div>
                                        <InputError message={errors.password?.message} />
                                    </div>

                                    <div>
                                        <label className="font-bold" htmlFor="newPassword">New Password</label>
                                        <div className="relative w-full">
                                            <input {...register("newPassword")} id="newPassword" autoComplete="new-password"
                                                placeholder="Enter your new password"
                                                className="input-fields focus:outline-none focus:ring-2 focus:ring-indigo-600 text-sm"
                                                type={showNew ? "text" : "password"} />
                                            <button type="button" onClick={() => setShowNew(p => !p)} className="cursor-pointer p-2 active:scale-95 transition-all absolute right-2 top-1/2 -translate-y-1/2">
                                                {showNew ? <FaEye className='text-pink-700' /> : <FaRegEyeSlash className='text-indigo-700' />}
                                            </button>
                                        </div>
                                        <InputError message={errors.newPassword?.message} />
                                    </div>

                                    <div>
                                        <label className="font-bold" htmlFor="rePassword">Confirm Password</label>
                                        <div className="relative w-full">
                                            <input {...register("rePassword")} id="rePassword" autoComplete="new-password"
                                                placeholder="Confirm your new password"
                                                className="input-fields focus:outline-none focus:ring-2 focus:ring-indigo-600 text-sm"
                                                type={showConfirm ? "text" : "password"} />
                                            <button type="button" onClick={() => setShowConfirm(p => !p)} className="cursor-pointer p-2 active:scale-95 transition-all absolute right-2 top-1/2 -translate-y-1/2">
                                                {showConfirm ? <FaEye className='text-pink-700' /> : <FaRegEyeSlash className='text-indigo-700' />}
                                            </button>
                                        </div>
                                        <InputError message={errors.rePassword?.message} />
                                    </div>

                                    <div className="flex items-center justify-end gap-2 mt-4 mb-2">
                                        <Button type="button" className="text-pink-100 font-bold shadow-md active:scale-95 bg-pink-700" variant="shadow" onPress={onClose}>
                                            Cancel
                                        </Button>
                                        <Button type="submit" isLoading={isPending} variant="shadow" className="bg-indigo-700 text-slate-200 font-bold shadow-md active:scale-95">
                                            Change
                                        </Button>
                                    </div>
                                </form>
                            </ModalBody>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}
