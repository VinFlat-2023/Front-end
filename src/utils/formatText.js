export function getAccountTabLabel(value){
    switch (value) {
        case 'general':
            return "Thông tin cơ bản"
        case 'change_password':
            return "Đổi mật khẩu"
    }
}