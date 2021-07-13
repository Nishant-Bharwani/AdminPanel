const canEditEmp = ({ currentAdmin, record }) => {
    return currentAdmin && (
        currentAdmin.role === 'admin'
    )
}