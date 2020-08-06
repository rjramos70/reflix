// import React from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const estilo = {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: false,
    progress: undefined,
}

export const notifyError = (msg) => toast.error(msg, estilo);
export const notifyInfo = (msg) => toast.info(msg, estilo);
export const notifySuccess = (msg) => toast.success(msg, estilo);
export const notifyWarn = (msg) => toast.warn(msg, estilo);
export const notifyDefault = (msg) => toast(msg, estilo);
export const notifyDark = (msg) => toast.dark(msg, estilo);
export const notifyTest = (msg) => toast.success(msg, estilo);

export default {
    notifyError,
    notifyInfo,
    notifySuccess,
    notifyWarn,
    notifyDefault,
    notifyDark,
}