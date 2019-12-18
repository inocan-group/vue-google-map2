import { IMapTypeStyle } from '../map-types'
import { roadways, minimal } from './index'
export const roadwaysMinimal: IMapTypeStyle[] = [...roadways, ...minimal]
