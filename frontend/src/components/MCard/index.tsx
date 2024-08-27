import moment from 'moment';
import Card from 'react-bootstrap/Card';

interface Props {
  // key: number,
  title: string,
  subtitle: string,
  text: string[],
  canEdit: boolean,
  canDelete: boolean,
  onDelete: () => void,
  onEdit: () => void,
  id?: number,
  lastUpdate?: Date,
}

export default function MCard(arg: Props) {
  return (
    <Card style={{ width: '18rem' }}>
      <Card.Body>
        <Card.Title>{arg.title}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{arg.subtitle}</Card.Subtitle>
        {arg.text.map((text, index) => (
        <Card.Text key={index}>
             {text} 
        </Card.Text>
        ))}
        <Card.Link className={"btn btn-danger" + (arg.canDelete ? "" : " disabled")} onClick={arg.onDelete}>Apagar</Card.Link>
        <Card.Link className={"btn" + (arg.canEdit ? "" : " disabled")} onClick={arg.onEdit}>Editar</Card.Link>
        <br></br>
        <small className="text-info">Última alteração {moment(arg.lastUpdate).format("DD/MM HH:mm")}</small>
      </Card.Body>
    </Card>
  )
}