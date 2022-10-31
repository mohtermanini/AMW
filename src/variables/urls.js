
export const urls = {
    "base": "http://194.32.76.82:7542/api/",
    "material": {
        "index": "Material/GetAll",
        "store": "Material/Create",
        "edit": "Material/Edit",
        "delete": "Material/Delete"
    },
    "outlayTypes": {
        "index": "outlayTypes/GetAll",
        "store": "outlayTypes/Create",
        "edit": "outlayTypes/Edit",
        "delete": "outlayTypes/Delete"
    },
    "outlays": {
        "index": "Outlay/GetAll",
        "show": "Outlay/GetByUser",
        "store": "Outlay/Create",
        "edit": "Outlay/Edit",
        "delete": "Outlay/Delete"
    },
    "users": {
        "index": "User/GetAll",
        "store": "User/Create",
        "edit": "User/Edit",
        "delete": "User/Delete"
    },
    "reports": {
        "services_expenses": "Reports/GetServicesExpenses",
        "all_expenses": "Reports/GetAllExpenses",
        "users_expenses": "Reports/GetExpensesByUsers",
        "special_expenses": "Reports/GetSpecialExpenses",
    },
    "fetch": async (verb, url, bodyData, token) => {
        const response = await fetch(url, {
            method: verb,
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(bodyData)
        });
        return await response.json();
    }
}