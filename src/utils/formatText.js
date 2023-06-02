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
            return 'Tạo mới hợp đồng'
        case 'existsUser':
            return 'Gia hạn hợp đồng'
    }
}