function ValidatePhone(phone: string) {
    const regex = /^\(\d{2}\) \d{4,5}-\d{4}$/;
    return regex.test(phone);
}

export { ValidatePhone }