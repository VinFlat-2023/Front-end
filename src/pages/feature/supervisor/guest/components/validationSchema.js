import * as Yup from 'yup';

export const ContractForNewUserSchema = Yup.object().shape({
    contractName: Yup.string().max(100, 'Tên hợp đồng không được vượt quá 100 ký tự').required('Tên hợp đồng là bắt buộc'),
    flatId: Yup.number().required('Tên căn hộ đang trống'),
    roomId: Yup.number().required('Tên phòng đang trống'),
    priceForRent: Yup.number().max(1000000000, 'Tiền thuê nhà không được lớn hơn 1,000,000,000').min(0, 'Tiền thuê nhà không được nhỏ hơn 0').required('Tiền thuê nhà không được để trống'),
    priceForService: Yup.number().max(1000000000, 'Tiền dịch vụ tòa nhà không được lớn hơn 1,000,000,000').min(0, 'Tiền dịch vụ tòa nhà không được nhỏ hơn 0').required('Tiền dịch vụ tòa nhà không được để trống'),
    priceForElectricity: Yup.number().max(1000000000, 'Tiền điện mỗi số không được lớn hơn 1,000,000,000').min(0, 'Tiền điện mỗi số không được nhỏ hơn 0').required('Tiền điện mỗi số không được để trống'),
    priceForWater: Yup.number().max(1000000000, 'Tiền nước mỗi khối không được lớn hơn 1,000,000,000').min(0, 'Tiền nước mỗi khối không được nhỏ hơn 0').required('Tiền nước mỗi khối không được để trống'),
    dateSigned: Yup.string().required('Ngày ký hợp đồng là bắt buộc'),
    startDate: Yup.string().required('Ngày bắt đầu đang trống'),
    endDate: Yup.string().required('Ngày kết thúc hợp đồng là bắt buộc'),
    description: Yup.string().required('Mô tả là bắt buộc'),
    renterUserName: Yup.string().required('Tên đăng nhập là bắt buộc'),
    fullName: Yup.string().required('Họ tên là bắt buộc'),
    renterEmail: Yup.string().required('Email là bắt buộc'),
    renterPhone: Yup.number().required('Số điện thoại'),
    renterBirthDate: Yup.string().required('Ngày sinh là bắt buộc'),
    address: Yup.string().required('Địa chỉ là bắt buộc'),
    gender: Yup.string().required('Giới tính là bắt buộc'),
    citizenNumber: Yup.string().required('Số CMND/CCCD là bắt buộc'),
    frontCitizenCard: Yup.object().required('Ảnh CMND/CCCD là bắt buộc'),
    backCitizenCard: Yup.object().required('Ảnh CMND/CCCD là bắt buộc'),
    contractImages: Yup.array().min(1,'Ảnh hợp đồng là bắt buộc'),
  });

  export const ContractForExistingUserSchema = Yup.object().shape({
    contractName: Yup.string().max(100, 'Tên hợp đồng không được vượt quá 100 ký tự').required('Tên hợp đồng là bắt buộc'),
    flatId: Yup.number().required('Tên căn hộ đang trống'),
    roomId: Yup.number().required('Tên phòng đang trống'),
    priceForRent: Yup.number().max(1000000000, 'Tiền thuê nhà không được lớn hơn 1,000,000,000').min(0, 'Tiền thuê nhà không được nhỏ hơn 0').required('Tiền thuê nhà không được để trống'),
    priceForService: Yup.number().max(1000000000, 'Tiền dịch vụ tòa nhà không được lớn hơn 1,000,000,000').min(0, 'Tiền dịch vụ tòa nhà không được nhỏ hơn 0').required('Tiền dịch vụ tòa nhà không được để trống'),
    priceForElectricity: Yup.number().max(1000000000, 'Tiền điện mỗi số không được lớn hơn 1,000,000,000').min(0, 'Tiền điện mỗi số không được nhỏ hơn 0').required('Tiền điện mỗi số không được để trống'),
    priceForWater: Yup.number().max(1000000000, 'Tiền nước mỗi khối không được lớn hơn 1,000,000,000').min(0, 'Tiền nước mỗi khối không được nhỏ hơn 0').required('Tiền nước mỗi khối không được để trống'),
    dateSigned: Yup.string().required('Ngày ký hợp đồng là bắt buộc'),
    startDate: Yup.string().required('Ngày bắt đầu đang trống'),
    endDate: Yup.string().required('Ngày kết thúc hợp đồng là bắt buộc'),
    description: Yup.string().required('Mô tả là bắt buộc'),
    fullName: Yup.string().required('Họ tên là bắt buộc'),
    frontCitizenCard: Yup.object().required('Ảnh CMND/CCCD là bắt buộc'),
    backCitizenCard: Yup.object().required('Ảnh CMND/CCCD là bắt buộc'),
    contractImages: Yup.array().min(1,'Ảnh hợp đồng là bắt buộc'),
  });

  export const UpdateContractSchema = Yup.object().shape({
    contractName: Yup.string().max(100, 'Tên hợp đồng không được vượt quá 100 ký tự').required('Tên hợp đồng là bắt buộc'),
    priceForRent: Yup.number().max(1000000000, 'Tiền thuê nhà không được lớn hơn 1,000,000,000').min(0, 'Tiền thuê nhà không được nhỏ hơn 0').required('Tiền thuê nhà không được để trống'),
    priceForService: Yup.number().max(1000000000, 'Tiền dịch vụ tòa nhà không được lớn hơn 1,000,000,000').min(0, 'Tiền dịch vụ tòa nhà không được nhỏ hơn 0').required('Tiền dịch vụ tòa nhà không được để trống'),
    priceForElectricity: Yup.number().max(1000000000, 'Tiền điện mỗi số không được lớn hơn 1,000,000,000').min(0, 'Tiền điện mỗi số không được nhỏ hơn 0').required('Tiền điện mỗi số không được để trống'),
    priceForWater: Yup.number().max(1000000000, 'Tiền nước mỗi khối không được lớn hơn 1,000,000,000').min(0, 'Tiền nước mỗi khối không được nhỏ hơn 0').required('Tiền nước mỗi khối không được để trống'),
    dateSigned: Yup.string().required('Ngày ký hợp đồng là bắt buộc'),
    startDate: Yup.string().required('Ngày bắt đầu đang trống'),
    endDate: Yup.string().required('Ngày kết thúc hợp đồng là bắt buộc'),
    description: Yup.string().required('Mô tả là bắt buộc'),
    contractImages: Yup.array().min(1, 'Ảnh hợp đồng là bắt buộc'),
  });


  export const getValidationSchema = (isEditPage, isNewUser) =>{ 

    if (!!isEditPage){
        return UpdateContractSchema;
    } else if (!!isNewUser){
        return ContractForNewUserSchema;
    } else if (!!!isNewUser && !!!isEditPage){
        return ContractForExistingUserSchema;
    }
  }

