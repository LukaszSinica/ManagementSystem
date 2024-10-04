package com.lukaszsinica.test;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TestTableRepostiory extends CrudRepository<TestTable, Long> {

}
