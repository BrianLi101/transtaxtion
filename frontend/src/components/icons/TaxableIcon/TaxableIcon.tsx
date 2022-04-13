// @ts-ignore
import TaxableImage from './TaxableImage.png';

interface Props {
  size?: number;
}

export const TaxableIcon = ({ size = 30 }: Props) => {
  return (
    <img src={TaxableImage} alt="Taxable Icon" height={size} width={size} />
  );
};
