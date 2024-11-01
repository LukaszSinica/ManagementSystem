package com.lukaszsinica.workplace.jwt;

import java.util.List;

public record JwtTokenResponse(String token, List<String> authority) {}


