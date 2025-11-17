import { useState, useEffect } from "react";
const initialForm = {
  firstName: "",
  lastName: "",
  email: "",
  phoneNumber: "",
  password: "",
  confirmPassword: "",
  address: "",
  pincode: "",
  receiveNotifications: false,
  agreeTerms: false,
  skills: [],
  gender: "",
  dob: "",
  description: "",
};

const skillsOptions = ["HTML", "CSS", "JavaScript", "React", "Node"];

export default function UserForm({ onSubmit, editData }) {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (editData) setForm(editData);
    else setForm(initialForm);
  }, [editData]);

  const validate = () => {
    const e = {};
    if (!form.firstName.trim()) e.firstName = "First name is required";
    if (!form.email.match(/^\S+@\S+\.\S+$/)) e.email = "Invalid email";
    if (!form.phoneNumber.match(/^\d{10}$/)) e.phoneNumber = "Phone must be 10 digits";
    if (!form.password) e.password = "Password is required";
    if (form.password !== form.confirmPassword) e.confirmPassword = "Passwords do not match";
    if (!form.address.trim()) e.address = "Address is required";
    if (!form.pincode.match(/^\d{6}$/)) e.pincode = "Pincode must be 6 digits";
    if (!form.skills.length) e.skills = "Please select at least one skill";
    if (!form.gender) e.gender = "Please select gender";
    if (!form.dob) e.dob = "Please select date of birth";
    if (!form.agreeTerms) e.agreeTerms = "You must accept the terms";
    return e;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      setForm({ ...form, [name]: checked });
    } else if (type === "select-multiple") {
      const selected = Array.from(e.target.selectedOptions, (o) => o.value);
      setForm({ ...form, skills: selected });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const v = validate();
    setErrors(v);
    if (Object.keys(v).length > 0) return;
    onSubmit(form);

    setForm(initialForm);
  };

  return (
    <form className="form-container" onSubmit={handleSubmit}>
      <h2>{editData ? "Edit User" : "Create User"}</h2>

      <div className="form-row" style={{ marginBottom: 40 }}>
        <label>First Name *</label>
        <input name="firstName" value={form.firstName} onChange={handleChange} />
      </div>
      <small className="error">{errors.firstName}</small>

      <div className="form-row" style={{ marginBottom: 40 }}>
        <label>Last Name</label>
        <input name="lastName" value={form.lastName} onChange={handleChange} />
      </div>

      <div className="form-row" style={{ marginBottom: 40 }}>
        <label>Email *</label>
        <input name="email" value={form.email} onChange={handleChange} />
      </div>
      <small className="error">{errors.email}</small>

      <div className="form-row" style={{ marginBottom: 40 }}>
        <label>Phone Number *</label>
        <input
          name="phoneNumber"
          value={form.phoneNumber}
          onChange={(e) => {
            const value = e.target.value;
            if (/^\d{0,10}$/.test(value)) {
              setForm({ ...form, phoneNumber: value });
            }
          }}
          maxLength={10}
        />
      </div>
      <small className="error">{errors.phoneNumber}</small>


      <div className="form-row" style={{ marginBottom: 40 }}>
        <label>Password *</label>
        <input type="password" name="password" value={form.password} onChange={handleChange} />
      </div>
      <small className="error">{errors.password}</small>

      <div className="form-row" style={{ marginBottom: 40 }}>
        <label>Confirm Password *</label>
        <input type="password" name="confirmPassword" value={form.confirmPassword} onChange={handleChange} />
      </div>
      <small className="error">{errors.confirmPassword}</small>

      <div className="form-row" style={{ marginBottom: 40 }}>
        <label>Address *</label>
        <input name="address" value={form.address} onChange={handleChange} />
      </div>
      <small className="error">{errors.address}</small>

      <div className="form-row" style={{ marginBottom: 40 }}>
        <label>Pincode *</label>
        <input name="pincode" value={form.pincode} onChange={handleChange} />
      </div>
      <small className="error">{errors.pincode}</small>

      <div className="form-row" style={{ marginBottom: 40 }}>
        <label>Skills *</label>
        <select
          name="skills"
          value={form.skills}
          onChange={handleChange}
          multiple
        >
          {skillsOptions.map(skill => (
            <option key={skill} value={skill}>{skill}</option>
          ))}
        </select>
      </div>
      <small className="error">{errors.skills}</small>

      <div className="form-row" style={{ marginBottom: 40 }}>
        <label>Gender *</label>
        <div className="radio-row">
          <label>
            <input type="radio" name="gender" value="Male" checked={form.gender === "Male"} onChange={handleChange} />
            Male
          </label>
          <label>
            <input type="radio" name="gender" value="Female" checked={form.gender === "Female"} onChange={handleChange} />
            Female
          </label>
        </div>
      </div>
      <small className="error">{errors.gender}</small>

      <div className="form-row" style={{ marginBottom: 40 }}>
        <label>Date of Birth *</label>
        <input type="date" name="dob" value={form.dob} onChange={handleChange} />
      </div>
      <small className="error">{errors.dob}</small>

      <div className="form-row full-width" style={{ marginBottom: 40 }}>
        <label>Description</label>
        <textarea name="description" value={form.description} onChange={handleChange}></textarea>
      </div>

      <div className="toggle-row" style={{ marginBottom: 40 }}>
        <label className="switch">
          <input
            type="checkbox"
            name="receiveNotifications"
            checked={form.receiveNotifications}
            onChange={handleChange}
          />
          <span className="slider round"></span>
        </label>
        <span className="label-text">Receive Notifications</span>
      </div>


      <div className="checkbox-row" style={{ marginBottom: 40 }}>
        <input type="checkbox" name="agreeTerms" checked={form.agreeTerms} onChange={handleChange} />
        <label>Agree to Terms *</label>
      </div>
      <small className="error">{errors.agreeTerms}</small>

      <button className="btn-submit">{editData ? "Update" : "Create"}</button>
    </form>
  );
}


