import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { FaFilePdf } from "react-icons/fa6";
import { FaTrash } from "react-icons/fa";
import { BsPencilSquare } from "react-icons/bs";
import React, { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  Button,
  CardBody,
  CardFooter,
  IconButton,
  Tooltip,
  Input,
} from "@material-tailwind/react";
import DialogBtn from "../../shared/components/Partials/DialogBtn";
import MyTable from "./MyTable";
import { userApi } from "../../config/axios";
import Modal from "./Modal";
import StatusButton from "./StatusButton";
import axios from "axios";

const ScheduleTable = () => {
  const [selectedRow, setSelectedRow] = useState(null);
  const [activeTab, setActiveTab] = useState("Pending");
  const [data, setData] = useState([]);
  const [allAppointments, setAllAppointments] = useState([]);
  const [filteredAppointments, setFilteredAppointments] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [recommendedBurialDate, setRecommendedBurialDate] = useState();
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    petName: "",
    contact: "",
    petBirthdate: "",
    petDeathdate: "",
    deathCause: "",
  });
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const rowsPerPage = 5;

  const fetchAppointments = async () => {
    try {
      const response = await userApi.get("/appointment");
      setAllAppointments(response.data);
      setFilteredAppointments(
        response.data.filter(
          (appointment) => appointment.appointmentStatus === "pending"
        )
      );
    } catch (error) {
      console.error("Error fetching appointments:", error);
    }
  };

  const handleTabChange = (filterField, filterValue, tabName) => {
    setActiveTab(tabName);
    setFilteredAppointments(
      allAppointments.filter(
        (appointment) => appointment[filterField] === filterValue
      )
    );
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  useEffect(() => {
    if (selectedAppointment) {
      setFormData({
        name: selectedAppointment.name || "",
        address: selectedAppointment.address || "",
        petName: selectedAppointment.petName || "",
        contact: selectedAppointment.contact || "",
        petBirthdate: selectedAppointment.petBirthdate
          ? new Date(selectedAppointment.petBirthdate)
              .toISOString()
              .split("T")[0]
          : "",
        petDeathdate: selectedAppointment.petDeathdate
          ? new Date(selectedAppointment.petDeathdate)
              .toISOString()
              .split("T")[0]
          : "",
        deathCause: selectedAppointment.deathCause || "",
      });
    }
  }, [selectedAppointment]);

  const columnsConfig = [
    { key: "_id", label: "Appointment ID" },
    { key: "createdAt", label: "Date Requested" },
    { key: "name", label: "Name" },
    { key: "petName", label: "Pet Name" },
    { key: "actions", label: "Actions" },
  ];

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, filteredAppointments]);

  const filteredData = filteredAppointments.filter((row) => {
    return columnsConfig.some((col) => {
      const value = row[col.key]?.toString().toLowerCase();
      return value?.includes(searchQuery.toLowerCase());
    });
  });

  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const handleEdit = (appointment) => {
    setSelectedAppointment(appointment);
    setShowModal(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (name === "petDeathdate") {
      recommendBurialDate(value);
    }
  };

  const recommendBurialDate = async (deathDate) => {
    try {
      const response = await axios.post("http://127.0.0.1:5000/predict", {
        deathDate,
      });
      if (response.data) {
        setRecommendedBurialDate(response.data); // Set the recommended burial date
        console.log("Response Data:", response.data); // Log the response data
      }
    } catch (err) {
      // Check if error has a response and capture the error message
      if (err.response && err.response.data) {
        const errorMessage =
          err.response.data.error || "An unknown error occurred.";
        console.error("Error Message:", errorMessage); // Log the error message
        setRecommendedBurialDate({ error: errorMessage }); // Optionally set the error in state
      } else {
        console.error("Unexpected Error:", err); // Log unexpected errors
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setSuccessMessage("");

    const validationErrors = {};
    if (!formData.name) validationErrors.name = "Name of Owner is required.";
    if (!formData.address) validationErrors.address = "Address is required.";
    if (!formData.petName)
      validationErrors.petName = "Name of Pet is required.";
    if (!formData.contact)
      validationErrors.contact = "Contact Number is required.";
    if (!formData.petBirthdate)
      validationErrors.petBirthdate = "Pet Birthdate is required.";
    if (!formData.petDeathdate)
      validationErrors.petDeathdate = "Pet Deathdate is required.";
    if (!formData.deathCause)
      validationErrors.deathCause = "Pet Cause of Death is required.";

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const submissionData = {
        ...formData,
        recommendedBurialDate: recommendedBurialDate?.burialDate || null,
      };

      const response = await userApi.post(
        `/appointment/${selectedAppointment._id}`,
        submissionData
      ); // Use PUT for updates

      if (response.data) {
        setSuccessMessage("Appointment updated successfully!");

        // Update the selected appointment with the updated data
        setData((prevData) =>
          prevData.map((appointment) =>
            appointment._id === selectedAppointment._id
              ? response.data
              : appointment
          )
        );

        // Refresh the filtered data
        setFilteredAppointments((prevAppointments) =>
          prevAppointments.map((appointment) =>
            appointment._id === selectedAppointment._id
              ? response.data
              : appointment
          )
        );

        // Close the modal
        setShowModal(false);
      }
    } catch (error) {
      setErrors({
        api: "Failed to update appointment. Please try again later.",
      });
    }
  };

  const handleDelete = async (appointmentId) => {
    try {
      await userApi.delete(`/appointment/${appointmentId}`);
      setData((prevData) =>
        prevData.filter((schedule) => schedule._id !== appointmentId)
      );
    } catch (error) {
      console.error("Error deleting schedule:", error);
    }
  };

  const handleView = (appointment) => {
    setSelectedAppointment(appointment);
    setShowModal(true);
  };

  const handlePdf = async (appointmentId) => {
    try {
      const response = await userApi.post(
        "/generatePdf",
        { appointmentId },
        {
          responseType: "blob",
        }
      );

      if (response instanceof Blob) {
        const url = window.URL.createObjectURL(response);
        window.open(url, "_blank");

        const downloadButton = document.createElement("a");
        downloadButton.href = url;
        downloadButton.download = `appointment_${appointmentId}.pdf`;
        downloadButton.innerText = "Download PDF";
        document.body.appendChild(downloadButton);

        window.URL.revokeObjectURL(url);
      } else {
        throw new Error("The response is not a valid Blob.");
      }
    } catch (error) {
      console.error("Error generating PDF:", error);
    }
  };

  const buttons = [
    { label: "Pending", field: "appointmentStatus", value: "pending" },
    { label: "Declined", field: "appointmentStatus", value: "declined" },
    { label: "Ongoing", field: "scheduleStatus", value: "ongoing" },
    { label: "Completed", field: "scheduleStatus", value: "completed" },
    { label: "Cancelled", field: "scheduleStatus", value: "cancelled" },
  ];

  return (
    <div className="flex flex-col w-full h-full bg-white border border-black rounded-3xl mb-96 font-dm_sans">
      <div className="flex flex-col gap-4 m-4 2xl:flex-row">
        <div className="grid items-center gap-2 md:grid-cols-3 2xl:flex">
          {buttons.map(({ label, field, value }) => (
            <StatusButton
              key={label}
              label={label}
              field={field}
              value={value}
              activeTab={activeTab}
              onClick={handleTabChange}
              allAppointments={allAppointments}
            />
          ))}
        </div>

        <div className="flex flex-col items-center justify-end w-full gap-6 md:items-end xl:items-center lg:flex-row">
          <div className="w-full 2xl:w-fit">
            <Input
              label="Search"
              placeholder="Search here..."
              icon={<MagnifyingGlassIcon className="w-5 h-5" />}
              className="rounded-lg"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="flex items-center justify-end w-full h-full gap-6 2xl:w-fit">
            <DialogBtn />
          </div>
        </div>
      </div>

      <CardBody className="px-4 overflow-x-auto border border-y-black">
        {paginatedData && (
          <MyTable
            data={paginatedData}
            columnsConfig={columnsConfig}
            handleDelete={activeTab === "Pending" && handleDelete}
            handleEdit={activeTab === "Pending" && handleEdit}
            handleView={activeTab !== "Pending" && handleView}
            handlePdf={activeTab == "Pending" && handlePdf}
          />
        )}

        {showModal && selectedAppointment && (
          <Modal>
            <form method="POST" className="p-6" onSubmit={handleSubmit}>
              <h3 className="text-lg font-semibold leading-none">
                Appointment Details
              </h3>
              <div className="flex flex-col gap-2 mt-4">
                <fieldset className="px-4 py-4 bg-gray-100 rounded-md ">
                  <h2 className="mb-2 font-medium leading-none text-gray-500">
                    Applicant Info
                  </h2>
                  <div className="flex gap-2 mb-2">
                    <div className="flex flex-col w-full">
                      <label className="text-sm">User ID: </label>
                      <span className="p-1 bg-gray-200 rounded">
                        {selectedAppointment.userId}
                      </span>
                    </div>
                    <div className="flex flex-col w-full">
                      <label className="text-sm">Name: </label>
                      <input
                        className="p-1 bg-gray-200 rounded"
                        type="text"
                        value={formData.name}
                        name="name"
                        readOnly={activeTab !== "Pending"}
                        onChange={handleChange}
                      />
                      {errors.name && (
                        <p className="text-sm text-red-500">{errors.name}</p>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <div className="flex flex-col w-full">
                      <label className="text-sm">Contact: </label>
                      <input
                        className="p-1 bg-gray-200 rounded"
                        type="text"
                        value={formData.contact}
                        name="contact"
                        readOnly={activeTab !== "Pending"}
                        onChange={handleChange}
                      />
                      {errors.contact && (
                        <p className="text-sm text-red-500">{errors.contact}</p>
                      )}
                    </div>
                    <div className="flex flex-col w-full">
                      <label className="text-sm">Address: </label>
                      <input
                        className="p-1 bg-gray-200 rounded"
                        type="text"
                        value={formData.address}
                        name="address"
                        readOnly={activeTab !== "Pending"}
                        onChange={handleChange}
                      />
                      {errors.address && (
                        <p className="text-sm text-red-500">{errors.address}</p>
                      )}
                    </div>
                  </div>
                </fieldset>
                <fieldset className="px-4 py-4 bg-gray-100 rounded-md ">
                  <h2 className="mb-2 font-medium leading-none text-gray-500">
                    Pet Info
                  </h2>
                  <div className="flex gap-2 mb-2">
                    <div className="flex flex-col w-full">
                      <label className="text-sm">Name: </label>
                      <input
                        className="p-1 bg-gray-200 rounded"
                        type="text"
                        value={formData.petName}
                        name="petName"
                        readOnly={activeTab !== "Pending"}
                        onChange={handleChange}
                      />
                      {errors.petName && (
                        <p className="text-sm text-red-500">{errors.petName}</p>
                      )}
                    </div>
                    <div className="flex flex-col w-full">
                      <label className="text-sm">Birthdate: </label>
                      <input
                        className="p-1 bg-gray-200 rounded"
                        type="date"
                        value={formData.petBirthdate}
                        name="petBirthdate"
                        readOnly={activeTab !== "Pending"}
                        onChange={handleChange}
                      />
                      {errors.petBirthdate && (
                        <p className="text-sm text-red-500">
                          {errors.petBirthdate}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <div className="flex flex-col w-full">
                      <label className="text-sm">Cause of Death: </label>
                      <input
                        className="p-1 bg-gray-200 rounded"
                        type="text"
                        value={formData.deathCause}
                        name="deathCause"
                        readOnly={activeTab !== "Pending"}
                        onChange={handleChange}
                      />
                      {errors.deathCause && (
                        <p className="text-sm text-red-500">
                          {errors.deathCause}
                        </p>
                      )}
                    </div>
                    <div className="flex flex-col w-full">
                      <label className="text-sm">Date of Death: </label>
                      <input
                        className="p-1 bg-gray-200 rounded"
                        type="date"
                        value={formData.petDeathdate}
                        name="petDeathdate"
                        readOnly={activeTab !== "Pending"}
                        onChange={handleChange}
                      />
                      {errors.petDeathdate && (
                        <p className="text-sm text-red-500">
                          {errors.petDeathdate}
                        </p>
                      )}
                    </div>
                  </div>
                  {recommendedBurialDate &&
                    (recommendedBurialDate.burialDate ? (
                      <div className="flex gap-2 px-2 py-1 mt-2 text-green-600 bg-green-100 rounded">
                        <p>
                          Recommended Burial Date:{" "}
                          {recommendedBurialDate?.burialDate}
                        </p>
                        <p>{recommendedBurialDate?.burialWeekday}</p>
                      </div>
                    ) : (
                      <div className="flex gap-2 px-2 py-1 mt-2 text-red-600 bg-red-100 rounded">
                        <p>{recommendedBurialDate?.error}</p>
                      </div>
                    ))}
                </fieldset>
              </div>
              {successMessage && (
                <p className="mt-2 text-sm text-green-500">{successMessage}</p>
              )}
              {errors.api && (
                <p className="mt-2 text-sm text-red-500">{errors.api}</p>
              )}
              <div className="flex justify-end mt-6">
                {activeTab === "Pending" && (
                  <Button type="submit" color="blue" className="mr-2">
                    Save
                  </Button>
                )}
                <Button color="red" onClick={() => setShowModal(false)}>
                  Close
                </Button>
              </div>
            </form>
          </Modal>
        )}
      </CardBody>
      <CardFooter className="flex justify-end gap-4">
        {totalPages > 0 ? (
          <>
            <Button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            >
              Previous
            </Button>
            <span>
              Page {currentPage} of {totalPages}
            </span>
            <Button
              disabled={currentPage === totalPages}
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
            >
              Next
            </Button>
          </>
        ) : (
          <span>Page 0 of 0</span>
        )}
      </CardFooter>
    </div>
  );
};

export default ScheduleTable;
