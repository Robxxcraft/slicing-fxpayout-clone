import React from 'react'
import TextInput from '../ui/TextInput';
import SelectInput from '../ui/SelectInput';
import Button from '../ui/Button';
import type { InputEditProfil, LoadingState } from '@/types/profile';

const EditProfile = ({
  form,
  submitEditProfile,
  handleChangeForm,
  errors,
  canUpdateProfile,
  loadingState
}: {
  form: InputEditProfil; 
  errors: Partial<Record<keyof InputEditProfil, string>>;
  handleChangeForm: (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => void;
  submitEditProfile: (e: React.FormEvent<HTMLFormElement>) => void;
  canUpdateProfile: boolean;
  loadingState: LoadingState
}) => {
    
  return (
    <div className="px-4 md:px-8 pt-4">
      <h2 className="text-[26px] font-medium">
        Informasi Profil
      </h2>
      <form onSubmit={submitEditProfile} className="mt-4 md:mt-8 w-full">
        <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-5 w-full">
          <div className="w-full">
            <TextInput 
              id="username" 
              label="Username" 
              icon="/user-icon.svg" 
              altIcon="Icon user" 
              placeholder="Masukkan username" 
              value={form.username} 
              onChangeForm={handleChangeForm} 
              typeInput="text" 
              errorMessage={errors.username}
              maxLength={20}
              required
            />
          </div>
          <div className="w-full">
            <SelectInput 
              id="role" 
              label="Role" 
              icon="/user-icon.svg"
              altIcon="Icon user" 
              defaultValue="&lt;Pilih Role&gt;" 
              value={form.role} 
              onChangeForm={handleChangeForm} 
              optionData={["admin"]}
              errorMessage={errors.role}
              required 
            />
          </div>
        </div>
        <Button 
          disabled={!canUpdateProfile || loadingState.isLoad}
          loading={loadingState.isLoad && loadingState.place === "edit-profile"}
          buttonType="submit" 
          variant="primary-light" 
          className="py-3! rounded-lg"
        >
          Save
        </Button>
      </form>
    </div>
  )
}

export default EditProfile;
