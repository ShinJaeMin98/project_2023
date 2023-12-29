package org.choongang.entities;

import jakarta.persistence.Entity;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data @Builder
@Entity
@NoArgsConstructor  // 기본 생성자
@AllArgsConstructor // 기본 생성자\

public class Member extends Base{
}
