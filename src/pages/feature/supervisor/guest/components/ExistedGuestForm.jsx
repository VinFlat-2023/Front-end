import { Stack, TextField } from "@material-ui/core";
import { useState } from "react";


export const ExistedGuestForm = ({ guestList, handleSelectUser, selectedUser }) => {

  return (
    <>
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 3, sm: 2 }}>
        <TextField
          select
          fullWidth
          label="Họ và tên"
          SelectProps={{ native: true }}
          onChange={handleSelectUser}
        >
          <option value="" />
          {guestList.map((option) => (
            <option key={option.RenterId} value={option.Username}>
              {option.FullName}
            </option>
          ))}
        </TextField>
        <TextField
          fullWidth
          disabled={true}
          label="Địa chỉ email"
          value={selectedUser?.Email}
        />
      </Stack>

      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 3, sm: 2 }}>
        <TextField
          fullWidth
          disabled={true}
          label="Tên tài khoản"
          value={selectedUser?.Username}
        />
        <TextField
          fullWidth
          disabled={true}
          label="Ngày sinh"
          value={selectedUser?.BirthDateReturn}
        />
      </Stack>

      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 3, sm: 2 }}>
        <TextField
          fullWidth
          disabled={true}
          label="Số điện thoại"
          value={selectedUser?.PhoneNumber}
        />
        <TextField
          fullWidth
          disabled={true}
          label="Địa chỉ"
          value={selectedUser?.Address}
        />
      </Stack>
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 3, sm: 2 }}>
        <TextField
          fullWidth
          disabled={true}
          label="CMND/CCCD"
          value={selectedUser?.PhoneNumber}
        />
        <TextField
          fullWidth
          disabled={true}
          label="Giới tính"
          value={selectedUser?.Gender}
        />
      </Stack>

    </>
  )
}