package in.ai.employeemanager.service;

import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import in.ai.employeemanager.exception.UserNotFoundException;
import in.ai.employeemanager.model.Employee;
import in.ai.employeemanager.repo.EmployeeRepo;
import jakarta.transaction.Transactional;

@Service
public class EmployeeService {
	private final EmployeeRepo employeeRepo;
	
	@Autowired
	public EmployeeService(EmployeeRepo employeeRepo) {
		this.employeeRepo = employeeRepo;
	}
	
	public Employee addEmployee(Employee employee) {
		employee.setEmployeeCode(UUID.randomUUID().toString());
		return employeeRepo.save(employee);
	}
	
	public List<Employee> findAllEmployees(){
		return employeeRepo.findAll();
	}
	
	public Employee updateEmployee(Employee employee) {
		return employeeRepo.save(employee);
	}
	
	public Employee findEmployeeById(Long id) {
		return employeeRepo.findEmployeeById(id)
				.orElseThrow(() -> new UserNotFoundException ("User by id " + id + "was not found"));
	}
	
	@Transactional
	public void deleteEmployee(Long id) {
	    try {
	        employeeRepo.deleteEmployeeById(id);
	    } catch (Exception e) {
	        throw new RuntimeException("Error deleting employee with id " + id, e);
	    }
	}


}
