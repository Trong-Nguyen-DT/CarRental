package com.dt.behuuchiencar.security.userprincal;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.dt.behuuchiencar.constant.ErrorConstants;
import com.dt.behuuchiencar.entity.UserEntity.UserEntity;
import com.dt.behuuchiencar.exception.MessageException;
import com.dt.behuuchiencar.repository.UserRepository;

@Service
public class CustomUserDetailService implements UserDetailsService{

    @Autowired
    private UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        UserEntity user = userRepository.findUserByUsernameAndDeletedFalse(username).orElseThrow(()-> new MessageException(ErrorConstants.INVALID_CREDENTIALS_MESSAGE, ErrorConstants.INVALID_CREDENTIALS_CODE));
        return UserPrinciple.build(user);

    }

    public static void main(String[] args) {
        PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        System.out.println(passwordEncoder.encode("123123"));
    }
    
}
