
const ContactTable = () => {
    return (
        <>
            <thead>
                <tr>
                    <th>
                        <div className="d-flex justify-content-start align-items-center gap-2 lh-1">
                            <b>#</b>
                            <span>Contact Name</span>
                        </div>
                    </th>
                    <th>Number</th>
                    <th>Status</th>
                    <th>Date Added</th>
                </tr>
            </thead>

            <tbody>
                {Array.from({ length: 7 }).map((_, ind) => (
                    <tr key={ind}>
                        <td>
                            <div className="d-flex justify-content-start align-items-start gap-2">
                                <b>{ind + 1}.</b>
                                <span>
                                    Jane Cooper
                                </span>
                            </div>
                        </td>

                        <td>
                            <span className="text--primary">
                                5146846548465
                            </span>
                        </td>

                        <td>
                            <span className="i-badge pill warning-soft">Pending</span>
                        </td>

                        <td>
                            <span className="text--primary">
                                25/06/2024
                            </span>
                        </td>
                    </tr>
                ))}
            </tbody>
        </>
    )
}

export default ContactTable