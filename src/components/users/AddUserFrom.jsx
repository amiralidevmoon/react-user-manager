import React from "react";
import {useForm} from "react-hook-form";
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from "yup";
import {v4 as uuidv4} from 'uuid';
import NameFamily from "./fields/NameFamily";
import Username from "./fields/Username";
import Email from "./fields/Email";
import Role from "./fields/Role";


const schema = yup.object({
    fullName: yup.string().required("وارد کردن نام اجباری می باشد"),
    userName: yup.string().matches(/^[a-zA-Z0-9_.-]+$/, "لطفا از کاراکتر های انگلیسی استفاده نمایید").required("وارد کردن نام کاربری اجباری می باشد"),
    email: yup.string().email("ایمیل وارد شده صحیح نمی باشد").required("وارد کردن ایمیل اجباری می باشد")
}).required();

const AddUserFrom = ({toggleModal, fetchData, userEditingData, users}) => {

    const {register, handleSubmit, formState: {errors}} = useForm({
        resolver: yupResolver(schema)
    });

    const handleAddUser = (data) => {
        let updatedUsers = [];
        if (data.id === userEditingData?.id) {
            updatedUsers = users.filter(user => user.id !== userEditingData?.id)
            updatedUsers = [...updatedUsers, data]
        } else {
            updatedUsers = [...users, data]
        }
        localStorage.setItem('USERS_LIST', JSON.stringify(updatedUsers));
        fetchData()
        toggleModal()
    }

    const onSubmit = data => {
        const today = new Date();
        let now = today.toLocaleString("fa-IR");
        now = now.split('،')[0];
        data = {...data, dateCreatedAt: now, id: userEditingData?.id || uuidv4()}
        handleAddUser(data)
    }

    return (
        <form>
            <NameFamily register={register} userEditingData={userEditingData} errors={errors}/>

            <Username register={register} userEditingData={userEditingData} errors={errors}/>

            <Email register={register} userEditingData={userEditingData} errors={errors}/>

            <Role register={register} userEditingData={userEditingData} errors={errors}/>

            <button className="bg-cyan-500 p-3 text-gray-50 rounded my-6 w-full font-bold"
                    onClick={handleSubmit(onSubmit)}>افزودن
            </button>
        </form>
    );
}

export default AddUserFrom;
