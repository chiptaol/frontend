import * as yup from 'yup'

export function validate(input: unknown) {
  return yup
    .object()
    .shape({
      id: yup.number().required(),
      status: yup
        .mixed<'pending' | 'available' | 'unavailable'>()
        .oneOf(['pending', 'available', 'unavailable'])
        .required(),
    })
    .validateSync(input)
}
