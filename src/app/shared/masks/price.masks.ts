
import createNumberMask from 'text-mask-addons/dist/createNumberMask';


export const priceMask = Object.freeze({
  mask: createNumberMask({
    allowDecimal: false,
    // integerLimit: 8,
    prefix: '',
    thousandsSeparatorSymbol: ','
  })
});