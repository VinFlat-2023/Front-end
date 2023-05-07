export function getTabLabel(value){
    switch (value) {
        case 'general':
            return "Thông tin cơ bản"
        case 'change_password':
            return "Đổi mật khẩu"
        case 'income':
            return 'Phiếu thu'
        case 'expense':
            return 'Phiếu chi'
    }
}