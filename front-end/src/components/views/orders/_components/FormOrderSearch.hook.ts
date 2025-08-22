import { useForm } from 'react-hook-form'

type IForm = {
  typeId?: string
  tagIds?: number[]
  active?: string
}
export const useFormOrderSearchHook = () => {
  const {
    watch,
    setValue
  } = useForm<IForm>({
    defaultValues: {
      typeId: '',
      tagIds: [],
      active: '0',
    }
  })

  const values = watch()

  const setValues = (currentValues: Partial<IForm>) => {
    Object.entries(currentValues).forEach(([key, value]) =>
      setValue(key as keyof IForm, value)
    );
  }

  return {
    values,
    setValues
  }
}
