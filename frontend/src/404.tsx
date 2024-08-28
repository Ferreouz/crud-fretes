
export default function Page404() {
    return (
        <>
            <div className="d-flex align-items-center justify-content-center vh-100">
                <div className="text-center">
                    <h1 className="display-1 fw-bold">404</h1>
                    <p className="fs-3"> <span className="text-danger">Opps!</span> Página não encontrada.</p>
                    <p className="lead">
                        A página que procura não existe
                    </p>
                    <a href="/" className="btn btn-primary">Ir para inicio</a>
                </div>
            </div>
        </>
    )
}
