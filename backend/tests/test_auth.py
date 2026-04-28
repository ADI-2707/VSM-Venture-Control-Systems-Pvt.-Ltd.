from fastapi.testclient import TestClient
from app.core.security import create_access_token
from main import app

client = TestClient(app)


def test_login_fail():
    response = client.post("/auth/login", json={
        "email": "wrong@test.com",
        "password": "wrong"
    })
    assert response.status_code == 401


def test_login_success():
    response = client.post("/auth/login", json={
        "email": "admin@vsm.com",
        "password": "admin123"
    })
    assert response.status_code == 200
    assert "access_token" in response.json()
    assert "refresh_token" in response.json()


def test_refresh_token_success():
    login_response = client.post("/auth/login", json={
        "email": "admin@vsm.com",
        "password": "admin123"
    })
    refresh_token = login_response.json()["refresh_token"]

    response = client.post("/auth/refresh", json={"token": refresh_token})

    assert response.status_code == 200
    assert "access_token" in response.json()


def test_refresh_token_cannot_access_profile():
    login_response = client.post("/auth/login", json={
        "email": "admin@vsm.com",
        "password": "admin123"
    })
    refresh_token = login_response.json()["refresh_token"]

    response = client.get(
        "/auth/profile",
        headers={"Authorization": f"Bearer {refresh_token}"},
    )

    assert response.status_code == 401


def test_access_token_cannot_refresh():
    login_response = client.post("/auth/login", json={
        "email": "admin@vsm.com",
        "password": "admin123"
    })
    access_token = login_response.json()["access_token"]

    response = client.post("/auth/refresh", json={"token": access_token})

    assert response.status_code == 401


def test_malformed_access_token_returns_401():
    bad_token = create_access_token({
        "sub": "not-an-id",
        "role": "manager",
        "token_version": 0,
    })

    response = client.get(
        "/auth/profile",
        headers={"Authorization": f"Bearer {bad_token}"},
    )

    assert response.status_code == 401
