import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    updateProfile,
    signOut,
    setPersistence,
    browserSessionPersistence,
    onAuthStateChanged
} from "firebase/auth";

import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";
import { useState, useEffect } from "react";
import { app } from "../firebase/config";

export const useAuthentication = () => {
    const [user, setUser] = useState(null);
    const [role, setRole] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [cancelled, setCancelled] = useState(false);

    const auth = getAuth();
    const db = getFirestore(app);

    function checkIfIsCancelled() {
        if (cancelled) return;
    }

    // Função para buscar role do usuário
    const getUserRole = async (uid) => {
        const userDoc = await getDoc(doc(db, "users", uid));
        return userDoc.exists() ? userDoc.data().role : null;
    };

    // Observa mudanças de autenticação
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            if (currentUser) {
                setUser(currentUser);
                const userRole = await getUserRole(currentUser.uid);
                setRole(userRole);
            } else {
                setUser(null);
                setRole(null);
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    // Cadastro de usuário
    const createUser = async (data, role, cnpj = null, chaveAcesso = null) => {
        checkIfIsCancelled();
        setLoading(true);
        setError(null);
    
        try {
            if (!data.displayName) {
                throw new Error("O nome de exibição é obrigatório.");
            }

            const { user } = await createUserWithEmailAndPassword(auth, data.email, data.password);
            await updateProfile(user, { displayName: data.displayName });

            const userData = {
                nome: data.nome || '',
                email: data.email || '',
                telefone: data.telefone || '',
                dataNascimento: data.dataNascimento || '',
                role: role || 'colaborador', 
            };

            if (role === 'admin') {
                userData.cnpj = cnpj || null;
                userData.chaveAcesso = chaveAcesso || null;
            } else if (role === 'colaborador') {
                userData.cpf = data.cpf || null;
            }

            console.log("Dados que serão salvos no Firestore:", userData);
            await setDoc(doc(db, "users", user.uid), userData);

            setUser(user);
            setRole(role);

            return user;
        } catch (error) {
            console.error("Erro no cadastro:", error.message);
            setError(error.message || "Ocorreu um erro, por favor tente mais tarde.");
        }

        setLoading(false);
    };

    // Login de usuário
    const login = async (data) => {
        checkIfIsCancelled();
        setLoading(true);
        setError(null);

        try {
            await setPersistence(auth, browserSessionPersistence);
            const { user } = await signInWithEmailAndPassword(auth, data.email, data.password);
            const userRole = await getUserRole(user.uid);

            if (!userRole) {
                throw new Error("Erro ao recuperar tipo de usuário.");
            }

            setUser(user);
            setRole(userRole);
            return { user, role: userRole };
        } catch (error) {
            console.error("Erro no login:", error.message);
            setError(error.message || "Ocorreu um erro, por favor tente mais tarde.");
        }

        setLoading(false);
    };

    // Logout
    const logout = async () => {
        checkIfIsCancelled();
        await signOut(auth);
        setUser(null);
        setRole(null);
    };

    useEffect(() => {
        return () => setCancelled(true);
    }, []);

    return {
        auth,
        user,
        role,
        createUser,
        login,
        logout,
        error,
        loading,
    };
};

export const useAuth = useAuthentication;
