              {/* {isLoading ? <ReactLoading type={"bars"} color={"white"} /> :
                    <TblContainer>
                        <TblHead />
                        <TableBody>

                            {recordsAfterPagingAndSorting().map((item) => (
                                <TableRow key={item.id} >
                                    <TableCell onClick={() => history.push("/projects/" + item.id)}>{item.projectname}</TableCell>
                                    <TableCell onClick={() => history.push("/projects/" + item.id)}>{item.numberofplots}</TableCell>
                                    <TableCell onClick={() => history.push("/projects/" + item.id)}>{item.projectname}</TableCell>
                                    <TableCell onClick={() => history.push("/projects/" + item.id)}><img src={`data:image/png;base64,${new Buffer.from(item.image.data).toString("base64")}`} alt="" height="30px" width="50px" /></TableCell>
                                    <TableCell onClick={() => history.push("/projects/" + item.id)}>{new Date(item.updated_at).toLocaleDateString()}</TableCell>
                                    <TableCell>
                                        <Controls.ActionButton color="primary" onClick={() => { openInPopUp(item); }}>
                                            <EditOutlinedIcon fontSize="small" />
                                        </Controls.ActionButton>
                                        <Controls.ActionButton color="secondary"
                                            onClick={() => {
                                                setConfirmDialog({
                                                    isOpen: true,
                                                    title: "You are about to delete this Projects",
                                                    subTitle: "You cant reverse this process",
                                                    onConfirm: () => { onDelete(item._id) }
                                                })
                                            }
                                            }>
                                            <CloseIcon fontSize="small" />
                                        </Controls.ActionButton>
                                    </TableCell>
                                </TableRow>

                            ))
                            }
                        </TableBody>
                    </TblContainer>
                } */}