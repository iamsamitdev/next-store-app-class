import { Card } from '@mui/material'
import { useTheme } from '@mui/material/styles'

type Props = {
  className?: string
  children: JSX.Element | JSX.Element[]
  sx?: any
}

const BlankCard = ({ children, className, sx }: Props) => {

  const theme = useTheme()
  const borderColor = theme.palette.divider

  return (
    <Card
      sx={{ p: 0,  border: `1px solid ${borderColor}`, position: 'relative', sx }}
      className={className}
      elevation={0}
      variant={'outlined'}
    >
      {children}
    </Card>
  )
}

export default BlankCard
