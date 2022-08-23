import * as typed from 'typed-contracts'

import * as entity from './entities'

export const fetchActualPremieresRequestOk = typed.obj({
  data: typed.arr(entity.actualPremiere),
})

export const fetchPremieresRequestOk = typed.obj({
  schedule: typed.arr(typed.str),
  premieres: typed.arr(entity.premiere),
})
