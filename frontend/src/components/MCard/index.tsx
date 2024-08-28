import moment from 'moment';
import Card from 'react-bootstrap/Card';

interface Props {
  // key: number,
  title: string,
  subtitle: string,
  text: string[],
  canEdit: boolean,
  canDelete: boolean,
  onDelete?: () => void,
  onEdit?: () => void,
  id?: number,
  lastUpdate?: Date,
  activeItem?: boolean,
  footer?: JSX.Element,
}

export default function MCard(arg: Props) {
  return (
    <Card style={{ width: '18rem', height: '18rem' }}>
      <Card.Body>
        <Card.Title className={arg.activeItem ? '' : 'text-muted'}>{arg.title}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{arg.subtitle}</Card.Subtitle>
        <br />
        <Card>
          {arg.text.map((text, index) => (
            <Card.Text key={index}>
              {text}
            </Card.Text>
          ))}
        </Card>
      </Card.Body>
      <Card.Footer>
        <Card.Link className={"btn btn-danger" + (arg.canDelete ? "" : " disabled")} onClick={arg.onDelete}>Apagar</Card.Link>
        <Card.Link className={"btn" + (arg.canEdit ? "" : " disabled")} onClick={arg.onEdit}>Editar</Card.Link>
        <br />
        {
          arg.activeItem &&
          <small className="text-info">Última alteração {moment(arg.lastUpdate).format("DD/MM HH:mm")}</small>
        }
        {
          !arg.activeItem &&
          <small className="text-muted">Desativado em {moment(arg.lastUpdate).format("DD/MM HH:mm")}</small>
        }
        {arg.footer}
      </Card.Footer>
    </Card>
  )
}