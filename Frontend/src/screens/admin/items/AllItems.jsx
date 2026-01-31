import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import axios from "../../../utils/axios";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import UpdateModal from "./UpdateModal";

const MySwal = withReactContent(Swal);




  