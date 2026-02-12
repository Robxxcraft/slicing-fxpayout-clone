import React from 'react'
import TextInput from '../ui/TextInput';
import Button from '../ui/Button';
import type { InputChangePassword, LoadingState } from '@/types/profile';

const UpdatePassword = ({
  form,
  submitChangePassword,
  handleChangeForm,
  errors,
  loadingState
}: {
  form: InputChangePassword; 
  errors: Partial<Record<keyof InputChangePassword, string>>;
  handleChangeForm:React.ChangeEventHandler<HTMLSelectElement | HTMLInputElement>;
  submitChangePassword: (e: React.FormEvent<HTMLFormElement>) => void;
  loadingState: LoadingState
}) => {
  return (
    <div className="px-4 md:px-8 pt-9 pb-4">
        <h2 className="text-[26px] font-medium">
          Change Password
        </h2>
        <form onSubmit={submitChangePassword} className="mt-4 md:mt-8 w-full">
          <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-5 w-full">
            <div className="w-full">
              <TextInput 
                id="oldPassword" 
                label="Old Password" 
                icon="/lock-icon.svg" 
                altIcon="Icon lock" 
                placeholder="Masukkan password lama" 
                value={form.oldPassword} 
                onChangeForm={handleChangeForm} 
                typeInput="password" 
                autoComplete="off"
                errorMessage={errors.oldPassword}
                maxLength={12}
                required
              />
            </div>
            <div className="w-full">
              <TextInput 
                id="newPassword" 
                label="New Password" 
                icon="/lock-icon.svg" 
                altIcon="Icon lock" 
                placeholder="Masukkan password baru" 
                value={form.newPassword} 
                onChangeForm={handleChangeForm} 
                typeInput="password" 
                autoComplete="off"
                errorMessage={errors.newPassword}
                maxLength={12}
                required
              />
            </div>
            <div className="col-span-1 md:col-span-2 w-full">
              <TextInput 
                id="confirmationPassword" 
                label="Confirmation Password" 
                icon="/lock-icon.svg" 
                altIcon="Icon lock" 
                placeholder="Masukkan konfirmasi password" 
                value={form.confirmationPassword} 
                onChangeForm={handleChangeForm} 
                typeInput="password" 
                autoComplete="off"
                errorMessage={errors.confirmationPassword}
                maxLength={12}
                required
              />
            </div>
          </div>
          <Button 
            disabled={loadingState.isLoad}
            loading={loadingState.isLoad && loadingState.place === "change-password"}
            buttonType="submit" 
            variant="primary-light" 
            className="py-3! rounded-lg"
          >
            Update Password
          </Button>
        </form>
    </div>
  )
}

export default UpdatePassword;
