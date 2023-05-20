import { Stack, TextField } from "@material-ui/core";
import { useState } from "react";

const gender = [{ id: '1', label: 'Nam' }, { id: '2', label: 'Nữ' }];

export const NewGuestForm = ({ getFieldProps, touched, errors }) => {

  return (
    <>
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 3, sm: 2 }}>
        <TextField
          fullWidth
          label="Họ và tên"
          {...getFieldProps('fullName')}
          error={Boolean(touched.fullName && errors.fullName)}
          helperText={touched.fullName && errors.fullName}
        />
        <TextField
          fullWidth
          label="Địa chỉ email"
          {...getFieldProps('renterEmail')}
          error={Boolean(touched.renterEmail && errors.renterEmail)}
          helperText={touched.renterEmail && errors.renterEmail}
        />
      </Stack>

      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 3, sm: 2 }}>
        <TextField
          fullWidth
          label="Tên tài khoản"
          {...getFieldProps('userName')}
          error={Boolean(touched.userName && errors.userName)}
          helperText={touched.userName && errors.userName}
        />
        <TextField
          fullWidth
          label="Ngày sinh"
          {...getFieldProps('renterBirthDate')}
          error={Boolean(touched.renterBirthDate && errors.renterBirthDate)}
          helperText={touched.renterBirthDate && errors.renterBirthDate}
        />
      </Stack>

      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 3, sm: 2 }}>
        <TextField
          fullWidth
          label="Số điện thoại"
          {...getFieldProps('renterPhone')}
          error={Boolean(touched.renterPhone && errors.renterPhone)}
          helperText={touched.renterPhone && errors.renterPhone}
        />
        <TextField
          fullWidth
          label="Địa chỉ"
          {...getFieldProps('address')}
          error={Boolean(touched.address && errors.address)}
          helperText={touched.address && errors.address}
        />
      </Stack>
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 3, sm: 2 }}>
        <TextField
          fullWidth
          label="CMND/CCCD"
          {...getFieldProps('citizenNumber')}
          error={Boolean(touched.citizenNumber && errors.citizenNumber)}
          helperText={touched.citizenNumber && errors.citizenNumber}
        />
        <TextField
          select
          fullWidth
          label="Giới tính"
          {...getFieldProps('gender')}
          SelectProps={{ native: true }}
          error={Boolean(touched.gender && errors.gender)}
          helperText={touched.gender && errors.gender}
        >
          <option value="" />
          {gender.map((option) => (
            <option key={option.id} value={option.id}>
              {option.label}
            </option>
          ))}
        </TextField>
      </Stack>

    </>
  )
}