export function getTabLabel(value){
    switch (value) {
        case 'general':
            return "Thông tin cơ bản"
        case 'change_password':
            return "Đổi mật khẩu"
        case 'income':
            return 'Hóa đơn thu'
        case 'expense':
            return 'Hóa đơn chi'
        case 'newUser':
            return 'Khách thuê mới'
        case 'existsUser':
            return 'Khách thuê đã có tài khoản'
    }
}